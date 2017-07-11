module State exposing (..)

import Dict
import Rest exposing (..)
import Time exposing (Time, minute)
import Types exposing (..)


init : ( Model, Cmd Msg )
init =
    ( { availableDates = Nothing
      , selectedDate = "-"
      , selectedMonthView = "-"
      , whPerDay = Dict.fromList []
      , lastServerUpdate = Nothing
      }
    , Cmd.batch
        [ getLastServerUpdate
        , getAvailableDates
        ]
    )



-- --------------------------------------------------------------------------
-- --------------------------------------------------------------------------


subscriptions : Model -> Sub Msg
subscriptions model =
    Time.every minute Tick



-- --------------------------------------------------------------------------
