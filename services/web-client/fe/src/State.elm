module State exposing (..)
import Rest exposing (..)
import Types exposing (..)
import Dict
import Time exposing (Time, minute)
import MyDate exposing (getLatestAvailableDate)


init : ( Model, Cmd Msg )
init =
    (   { availableDates = Loading
        , selectedDate = "-"
        , whPerDay = Dict.fromList []
        , lastServerUpdate = Nothing
        }
    , Cmd.batch(
        [ getLastServerUpdate
        , getAvailableDates
        ])
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GetAvailableDatesResponse res -> handleGetAvailDatesRes model res
        DateChange val -> handleDateChange model val
        GetWhFor res -> handleGetWh model res
        CheckLastUpdate res -> handleCheckLastUpdate model res
        Tick newTime -> handleTick model newTime
-- --------------------------------------------------------------------------


-- --------------------------------------------------------------------------
handleGetAvailDatesRes :
    Model -> FetchedData (List AvailableDate) -> ( Model, Cmd Msg )
handleGetAvailDatesRes model response =
    let defaultResult =
        ( { model | availableDates = response }, Cmd.none )
    in
    case response of
        Succeed availableDates ->
            let latestDate = getLatestAvailableDate availableDates
            in
            case latestDate of
                Nothing ->
                    defaultResult
                Just l ->
                    ( { model | availableDates = response, selectedDate = l }
                    , getWhFor l l  -- Since we set the selected date,
                                    --  now get the Wh for that date
                    )
        Loading ->
            defaultResult
        Failed error ->
            defaultResult


handleDateChange : Model -> String -> ( Model, Cmd Msg )
handleDateChange model selectedDateString =
    ( { model | selectedDate = selectedDateString }
    , getWhFor selectedDateString selectedDateString
    )


handleGetWh : Model -> FetchedData (List Day) -> ( Model, Cmd Msg )
handleGetWh model response =
    case response of
        Succeed days ->
            let day = (List.head days)
            in
            case day of
                Nothing ->
                    ( model, Cmd.none )
                Just d ->
                    let date = d.date
                    in
                    ( { model |
                        whPerDay =
                        Dict.insert date d.value model.whPerDay
                      }
                    , Cmd.none
                    )
        Loading ->
            ( model, Cmd.none )
        Failed e ->
            let error = (Debug.log "error:" e)
            in
            ( model, Cmd.none )


handleCheckLastUpdate : Model -> FetchedData Int -> ( Model, Cmd Msg )
handleCheckLastUpdate model response =
    case response of
        Succeed lastServerUpdate ->
            ( { model | lastServerUpdate = Just lastServerUpdate }
            , Cmd.none
            )
        Loading ->
            ( model, Cmd.none )
        Failed e ->
            let error = (Debug.log "error:" e)
            in
            ( model, Cmd.none )


handleTick : Model -> Float -> ( Model, Cmd Msg )
handleTick model newTime =
    case model.availableDates of
        Succeed availableDates ->
            let latestDate = getLatestAvailableDate availableDates
            in
            case latestDate of
                Nothing ->
                    ( model, getLastServerUpdate )
                Just l ->
                    ( model, Cmd.batch  [ getLastServerUpdate
                                        , (getWhFor l l)
                                        ]
                    )
        _ ->
            ( model, getLastServerUpdate )
-- --------------------------------------------------------------------------


-- --------------------------------------------------------------------------
subscriptions : Model -> Sub Msg
subscriptions model =
  Time.every minute Tick
-- --------------------------------------------------------------------------
