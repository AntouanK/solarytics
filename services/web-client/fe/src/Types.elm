module Types exposing (..)

import Http
import Dict


type alias AvailableDate =
    { date : String }

type alias Day =
    { date : String
    , value : Int
    }

type FetchedData a
    = Loading
    | Failed Http.Error
    | Succeed a



type alias Model =
    { availableDates : FetchedData (List AvailableDate)
    , selectedDate : String
    , whPerDay : Dict.Dict String Int
    }

type Msg
    = GetAvailableDatesResponse (FetchedData (List AvailableDate))
    | DateChange (String)
    | GetWhFor (FetchedData (List Day))
