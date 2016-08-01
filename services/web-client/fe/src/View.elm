module View exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Types exposing (..)
import SingleDateView
import MonthView
import MyDate exposing (..)
import Date exposing (fromTime)



root : Model -> Html Msg
root model =
    div [ style [ ("background-color", "#1b2b44")
                , ("font-family", "'Ubuntu Mono', sans-serif")
                , ("font-size", "1.3em")
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
        (List.concat
            [ stylesheet
            , renderAvailableDates model
            , renderLastServerUpdate model
            ]
        )
-- --------------------------------------------------------------------------



renderAvailableDates : Model -> List (Html Msg)
renderAvailableDates model =
  case model.availableDates of
      Loading ->
          [ SingleDateView.renderMessage "Loading" ]

      Failed error ->
          [ SingleDateView.renderMessage (toString error) ]

      Succeed availableDates ->
          [ MonthView.render
              (datesToMonthdata availableDates)
              model.whPerDay
              model.selectedMonthView
          , SingleDateView.render
              model.selectedDate model.whPerDay availableDates
          ]


renderLastServerUpdate : Model -> List (Html Msg)
renderLastServerUpdate model =
  [div  [ style [ ("flex", "0 0 auto")
                , ("margin", "30px")
                ]
        ]
      (case model.lastServerUpdate of
          Nothing ->
              [ div [ style [("padding", "10px")] ]
                    [ text "Last server update : unknown!" ]
              ]

          Just l ->
              let dateString = toString (Date.fromTime (toFloat l))
              in
              [ div [ style [("padding", "10px")] ]
                    [ text ("Last server update : " ++ dateString) ]
              ]
      )
  ]


stylesheet : List (Html a)
stylesheet =
    let
        tag = "link"
        attrs =
            [ attribute "rel"       "stylesheet"
            , attribute "property"  "stylesheet"
            , attribute "href"      "https://fonts.googleapis.com/css?family=Ubuntu+Mono"
            ]
        children = []
    in
    [ node tag attrs children ]
