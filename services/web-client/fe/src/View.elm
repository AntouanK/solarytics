module View exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Types exposing (..)
import SingleDate exposing (..)
import MyDate exposing (..)
import Date exposing (fromTime)



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
                , ("flex-direction", "row")
                , ("flex-wrap", "wrap")
                , ("align-items", "center")
                , ("overflow-y", "scroll")
                , ("overflow", "hidden")
                ]
        ]
        (List.append
          (renderAvailableDates model)
          (renderLastServerUpdate model)
        )
-- --------------------------------------------------------------------------



renderAvailableDates : Model -> List (Html Msg)
renderAvailableDates model =
  case model.availableDates of
      Loading ->
          [ SingleDate.renderMessage "Loading" ]

      Failed error ->
          [ SingleDate.renderMessage (toString error) ]

      Succeed availableDates ->
          let d1 = Debug.log "- selectedDate" model.selectedDate in
          [ SingleDate.render model.selectedDate model.whPerDay availableDates
          , (renderMonthsData (datesToMonthdata availableDates))
          ]


renderLastServerUpdate : Model -> List (Html Msg)
renderLastServerUpdate model =
  [div [ style [ ("flex", "0 0 280px") ] ]
      (case model.lastServerUpdate of
          Nothing ->
              [ text "Last server update : unknown!" ]

          Just l ->
              let dateString = toString (Date.fromTime (toFloat l))
              in
              [ text ("Last server update : " ++ dateString) ])
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
  div [ style [ ("flex", "1 0 auto")
              , ("padding", "30px")
              , ("margin", "30px")
              , ("border", "aliceblue 1px solid")
              ]
      ]
      [ select  []
                (List.reverse (List.map monthToOption monthDataList))
      ]
