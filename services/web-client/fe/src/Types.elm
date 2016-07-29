module Types exposing (..)

import Http


type alias AvailableDate =
    { date : String }


type FetchedData a
    = Loading
    | Failed Http.Error
    | Succeed a


-- Model
type alias Model =
    { availableDates : FetchedData (List AvailableDate)
    }


type Msg
    = GetAvailableDatesResponse (FetchedData (List AvailableDate))
