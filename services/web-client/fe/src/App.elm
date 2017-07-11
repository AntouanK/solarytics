module App exposing (..)

import Html exposing (Html)
import State
import State.Update exposing (update)
import Types
import View


main : Program Never Types.Model Types.Msg
main =
    Html.program
        { init = State.init
        , update = update
        , subscriptions = State.subscriptions
        , view = View.root
        }
