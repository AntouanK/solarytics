module State.Update exposing (update)

import Dict
import Http
import MyDate exposing (datesToMonthdata, getLatestAvailableDate)
import Rest exposing (..)
import String
import Types exposing (..)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GetAvailableDatesResponse res ->
            handleGetAvailDatesRes model res

        DateChange val ->
            handleDateChange model val

        GetWhFor res ->
            handleGetWh model res

        CheckLastUpdate res ->
            handleCheckLastUpdate model res

        Tick newTime ->
            handleTick model newTime

        MonthViewSelect val ->
            handleMonthViewSelect model val



-- --------------------------------------------------------------------------
-- --------------------------------------------------------------------------


handleGetAvailDatesRes :
    Model
    -> Result Http.Error (List AvailableDate)
    -> ( Model, Cmd Msg )
handleGetAvailDatesRes model response =
    let
        defaultResult =
            ( model, Cmd.none )
    in
    case response of
        Ok availableDates ->
            let
                latestDate =
                    getLatestAvailableDate availableDates
            in
            let
                latestMonth =
                    case
                        List.reverse (datesToMonthdata availableDates)
                            |> List.head
                    of
                        Nothing ->
                            ""

                        Just m ->
                            m.key
            in
            case latestDate of
                Nothing ->
                    ( { model | availableDates = Just availableDates }, Cmd.none )

                Just l ->
                    let
                        nextModel =
                            { model
                                | availableDates = Just availableDates
                                , selectedDate = l
                                , selectedMonthView = latestMonth
                            }
                    in
                    update (MonthViewSelect latestMonth) nextModel

        Err error ->
            defaultResult


handleDateChange : Model -> String -> ( Model, Cmd Msg )
handleDateChange model selectedDateString =
    ( { model | selectedDate = selectedDateString }
    , getWhFor selectedDateString selectedDateString
    )


handleGetWh : Model -> Result Http.Error (List Day) -> ( Model, Cmd Msg )
handleGetWh model response =
    case response of
        Ok days ->
            let
                whPerDayDict =
                    List.foldl
                        (\day currentDict ->
                            Dict.insert day.date day.value currentDict
                        )
                        model.whPerDay
                        days
            in
            ( { model | whPerDay = whPerDayDict }
            , Cmd.none
            )

        Err e ->
            let
                error =
                    Debug.log "error:" e
            in
            ( model, Cmd.none )


handleCheckLastUpdate : Model -> Result Http.Error Int -> ( Model, Cmd Msg )
handleCheckLastUpdate model response =
    case response of
        Ok lastServerUpdate ->
            ( { model | lastServerUpdate = Just lastServerUpdate }
            , Cmd.none
            )

        Err e ->
            let
                error =
                    Debug.log "error:" e
            in
            ( model, Cmd.none )


handleTick : Model -> Float -> ( Model, Cmd Msg )
handleTick model newTime =
    case model.availableDates of
        Just availableDates ->
            let
                latestDate =
                    getLatestAvailableDate availableDates
            in
            case latestDate of
                Nothing ->
                    ( model, getLastServerUpdate )

                Just l ->
                    ( model
                    , Cmd.batch
                        [ getLastServerUpdate
                        , getWhFor l l
                        ]
                    )

        _ ->
            ( model, getLastServerUpdate )


handleMonthViewSelect : Model -> String -> ( Model, Cmd Msg )
handleMonthViewSelect model monthSelected =
    let
        defaultResult =
            ( { model | selectedMonthView = monthSelected }
            , Cmd.none
            )
    in
    case model.availableDates of
        Just availableDates ->
            let
                daysInMonth =
                    List.filter
                        (\avDate -> String.startsWith monthSelected avDate.date)
                        availableDates
                        |> List.map .date
                        |> List.sort
            in
            let
                firstDay =
                    List.head daysInMonth
            in
            let
                lastDay =
                    List.head (List.reverse daysInMonth)
            in
            case firstDay of
                Just firstDay ->
                    case lastDay of
                        Just lastDay ->
                            ( { model | selectedMonthView = monthSelected }
                            , getWhFor firstDay lastDay
                            )

                        Nothing ->
                            defaultResult

                Nothing ->
                    defaultResult

        _ ->
            defaultResult
