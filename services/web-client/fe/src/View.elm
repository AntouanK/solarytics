module View exposing (..)
import Html exposing (..)
import Html.Events exposing (on, targetValue)
import Html.Attributes exposing (..)
import Types exposing (..)
import Json.Decode as Decode
import Dict
import MyDate exposing (..)



root : Model -> Html Msg
root model =
    div [ style [ ("background-color", "#1b2b44")
                , ("color", "white")
                , ("position", "absolute")
                , ("top", "0")
                , ("right", "0")
                , ("bottom", "0")
                , ("left", "0")
                , ("display", "flex")
                ]
        ]
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
              [ div []
                    [ text ("Select date ")
                    , (datesRender
                        (List.reverse (List.sortBy .date availableDates))
                      )
                    , renderWh model.whPerDay model.selectedDate
                    ]
              , (renderMonthsData (datesToMonthdata availableDates))
              , text "ok"
              ]


renderMonthsData : List MonthData -> Html a
renderMonthsData monthDataList =
  let monthToOption m =
      let textContent = (monthToString m.month) ++ " " ++
                        (toString m.year)
      in
      option  [(value m.key)]
              [text textContent]
  in
  div []
      [ select  []
                (List.map monthToOption monthDataList)
      ]



renderWh : (Dict.Dict String Int) -> String -> Html Msg
renderWh whPerDay date =
  let selectedDayWh = Dict.get (Debug.log "key (read): " date) whPerDay
  in
    case selectedDayWh of
        Just val ->
          text (
            "Wh: " ++ (toString val) ++
            " / KWh: " ++ (toString ((toFloat val) / 1000))
          )
        Nothing ->
          text "nothing here"


selectDecoder : Decode.Decoder Msg
selectDecoder =
  Decode.map DateChange targetValue


datesRender : List AvailableDate -> Html Msg
datesRender list =
    select  [ style [("margin", "0 5px")]
            , on "change" selectDecoder
            ]
            (List.map dateSelectRender ({date = ""} :: list))


dateSelectRender : AvailableDate -> Html Msg
dateSelectRender availableDate =
    let dateInt = availableDate.date
    in
    option [(value dateInt)]
        [ text (dateToString dateInt) ]
