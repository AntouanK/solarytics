module Rest exposing (..)
import Http
import Json.Decode exposing (..)
import Task
import Types exposing (..)


-- -----------------------------------------------------------------------------
decodeAvailableDates : Decoder AvailableDate
decodeAvailableDates =
    object1 AvailableDate
        ("date" := string)


decodeAvailableDatesResponse : Decoder (List AvailableDate)
decodeAvailableDatesResponse =
    "content" := (list decodeAvailableDates)


availableDatesEndpoint : String
availableDatesEndpoint =
    "https://crazy.homeip.net/api/day-list"


getAvailableDates : Cmd Msg
getAvailableDates =
    Http.get decodeAvailableDatesResponse availableDatesEndpoint
        |> Task.perform Failed Succeed
        |> Cmd.map GetAvailableDatesResponse
-- -----------------------------------------------------------------------------


-- -----------------------------------------------------------------------------
decodeWhForRes : Decoder (List Day)
decodeWhForRes =
    "content" :=
        (list
            (object2
                Day
                ("date" := string)
                ("value" := int))
        )


getWhFor : String -> String -> Cmd Msg
getWhFor startDate endDate =
    let endpoint =
        "https://crazy.homeip.net/api/wh/per/date/" ++
            startDate ++ "/" ++ endDate
    in
    Http.get decodeWhForRes endpoint
        |> Task.perform Failed Succeed
        |> Cmd.map GetWhFor
-- -----------------------------------------------------------------------------


-- -----------------------------------------------------------------------------
decodeLastUpdateResponse : Decoder Int
decodeLastUpdateResponse =
    at ["content", "timestamp"] int


getLastServerUpdate : Cmd Msg
getLastServerUpdate =
    let endpoint = "https://crazy.homeip.net/api/last-update"
    in
    Http.get decodeLastUpdateResponse endpoint
        |> Task.perform Failed Succeed
        |> Cmd.map CheckLastUpdate
-- -----------------------------------------------------------------------------
