module State exposing (..)

import Rest exposing (..)
import Types exposing (..)


init : ( Model, Cmd Msg )
init =
    ( { availableDates = Loading }
    , getAvailableDates
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GetAvailableDatesResponse response ->
            ( { model | availableDates = response }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
