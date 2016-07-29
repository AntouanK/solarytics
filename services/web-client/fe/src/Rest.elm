module Rest exposing (..)

import Http
import Json.Decode exposing (..)
import Task
import Types exposing (..)


decodeAvailableDates : Decoder AvailableDate
decodeAvailableDates =
    object1 AvailableDate
        ("date" := string)


decodeAvailableDatesResponse : Decoder (List AvailableDate)
decodeAvailableDatesResponse =
    "content" := (list decodeAvailableDates)


endpoint : String
endpoint =
    "https://crazy.homeip.net/api/day-list"


getAvailableDates : Cmd Msg
getAvailableDates =
    Http.get decodeAvailableDatesResponse endpoint
        |> Task.perform Failed Succeed
        |> Cmd.map GetAvailableDatesResponse
