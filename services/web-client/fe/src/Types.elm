module Types exposing (..)

import Http
import Dict
import Time exposing (Time)


type alias AvailableDate =
    { date : String }

type alias Day =
    { date : String
    , value : Int
    }

type alias Date =
    { day : Int
    , month : Month
    , year : Int
    }

type alias MonthData =
    { totalDays : Int
    , month: Month
    , year : Int
    , daysData : List Day
    , key : String
    }

type Month = January
    | February
    | March
    | April
    | May
    | June
    | July
    | August
    | September
    | October
    | November
    | December
    | InvalidMonth

stringToMonth : String -> Month
stringToMonth m =
    case m of
        "January" -> January
        "February" -> February
        "March" -> March
        "April" -> April
        "May" -> May
        "June" -> June
        "July" -> July
        "August" -> August
        "September" -> September
        "October" -> October
        "November" -> November
        "December" -> December
        _ -> InvalidMonth


monthToString : Month -> String
monthToString m =
    case m of
        January -> "January"
        February -> "February"
        March -> "March"
        April -> "April"
        May -> "May"
        June -> "June"
        July -> "July"
        August -> "August"
        September -> "September"
        October -> "October"
        November -> "November"
        December -> "December"
        InvalidMonth -> "Invalid month"


monthIntToText : Int -> String
monthIntToText m =
    case m of
        1  -> "January"
        2  -> "February"
        3  -> "March"
        4  -> "April"
        5  -> "May"
        6  -> "June"
        7  -> "July"
        8  -> "August"
        9  -> "September"
        10 -> "October"
        11 -> "November"
        12 -> "December"
        _ -> "Invalid month"


type FetchedData a
    = Loading
    | Failed Http.Error
    | Succeed a


type alias Model =
    { availableDates : FetchedData (List AvailableDate)
    , selectedDate : String
    , whPerDay : Dict.Dict String Int
    , lastServerUpdate : Maybe Int
    }

type Msg
    = GetAvailableDatesResponse (FetchedData (List AvailableDate))
    | DateChange String
    | GetWhFor (FetchedData (List Day))
    | CheckLastUpdate (FetchedData Int)
    | Tick Time
