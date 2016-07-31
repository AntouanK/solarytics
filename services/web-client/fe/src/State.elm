module State exposing (..)
import Rest exposing (..)
import Types exposing (..)
import Dict


init : ( Model, Cmd Msg )
init =
    (   { availableDates = Loading
        , selectedDate = "-"
        , whPerDay = Dict.fromList []
        }
    , getAvailableDates --  when starting, kick off the "get day list" call
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GetAvailableDatesResponse response ->
            ( { model | availableDates = response }
            , Cmd.none
            )
        DateChange val ->
            ( { model | selectedDate = (Debug.log "new selectedDate:" val) }
            , getWhFor val val
            )
        GetWhFor response ->
            case response of
                Succeed days ->
                    let day = (List.head days)
                    in
                    case day of
                        Nothing ->
                            ( model, Cmd.none )
                        Just d ->
                            let date = (Debug.log "key (write): " d.date)
                            in
                            ( { model |
                                whPerDay = Dict.insert date d.value model.whPerDay }
                            , Cmd.none
                            )
                Loading ->
                    ( model, Cmd.none )
                Failed e ->
                    let error = (Debug.log "error:" e)
                    in
                    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
