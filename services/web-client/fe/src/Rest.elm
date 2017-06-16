module Rest exposing (..)

import Http
import Json.Decode as Decode
    exposing
        ( Decoder
        , andThen
        , at
        , field
        , int
        , list
        , string
        )
import Task
import Types exposing (..)


-- -----------------------------------------------------------------------------


andMap : Decoder a -> Decoder (a -> b) -> Decoder b
andMap =
    Decode.map2 (|>)


decodeAvailableDates : Decoder AvailableDate
decodeAvailableDates =
    Decode.succeed AvailableDate
        |> andMap (field "date" string)


decodeAvailableDatesResponse : Decoder (List AvailableDate)
decodeAvailableDatesResponse =
    (field "content" <| list decodeAvailableDates)


availableDatesEndpoint : String
availableDatesEndpoint =
    "https://crazy.homeip.net/api/day-list"


getAvailableDates : Cmd Msg
getAvailableDates =
    Http.get availableDatesEndpoint decodeAvailableDatesResponse
        |> Http.send GetAvailableDatesResponse



-- -----------------------------------------------------------------------------
-- -----------------------------------------------------------------------------


decodeDay =
    Decode.succeed Day
        |> andMap (field "date" string)
        |> andMap (field "value" int)


decodeWhForRes : Decoder (List Day)
decodeWhForRes =
    (field "content" <| list decodeDay)


getWhFor : String -> String -> Cmd Msg
getWhFor startDate endDate =
    let
        endpoint =
            "https://crazy.homeip.net/api/wh/per/date/"
                ++ startDate
                ++ "/"
                ++ endDate
    in
        Http.get endpoint decodeWhForRes
            |> Http.send GetWhFor



-- -----------------------------------------------------------------------------
-- -----------------------------------------------------------------------------


decodeLastUpdateResponse : Decoder Int
decodeLastUpdateResponse =
    at [ "content", "timestamp" ] int


getLastServerUpdate : Cmd Msg
getLastServerUpdate =
    let
        endpoint =
            "https://crazy.homeip.net/api/last-update"
    in
        Http.get endpoint decodeLastUpdateResponse
            |> Http.send CheckLastUpdate



-- -----------------------------------------------------------------------------
