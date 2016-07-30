module View exposing (..)

import Html exposing (..)
import Html.Events exposing (on, targetValue)
import Html.Attributes exposing (..)
import Types exposing (..)
import Json.Decode as Decode
import Dict



root : Model -> Html Msg
root model =
    div []
        [ renderAvailableDates model
        ]



renderAvailableDates : Model -> Html Msg
renderAvailableDates model =
  case model.availableDates of
      Loading ->
          text "Loading"

      Failed error ->
          div [] [ text (toString error) ]

      Succeed availableDates ->
          div []
              [ text ("Selected date: " ++ model.selectedDate)
              , (datesRender
                  (List.reverse (List.sortBy .date availableDates))
                )
              , renderWh model.whPerDay model.selectedDate
              ]


renderWh : (Dict.Dict String Int) -> String -> Html Msg
renderWh whPerDay date =
  let selectedDayWh = Dict.get (Debug.log "key (read): " date) whPerDay
  in
    case selectedDayWh of
        Just val ->
          text ("Wh :" ++ (toString val))
        Nothing ->
          text "nothing here"


selectDecoder : Decode.Decoder Msg
selectDecoder =
  -- map : (a -> b) -> Decoder a -> Decoder b
  -- targetValue : Decoder String
  Decode.map DateChange targetValue


datesRender : List AvailableDate -> Html Msg
datesRender list =
  -- on : String -> Decoder msg -> Attribute msg
    select  [ style [("margin", "0 5px")]
            , on "change" selectDecoder
            ]
            (List.map dateRender list)

dateRender : AvailableDate -> Html Msg
dateRender availableDate =
    option [(value availableDate.date)]
        [ text availableDate.date ]
