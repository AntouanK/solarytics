module SingleDateView exposing (..)

import Types exposing (..)
import Html exposing (..)
import Html.Events exposing (on, targetValue)
import Html.Attributes exposing (style, value, selected)
import Json.Decode as Decode
import Dict
import MyDate exposing (..)


topStyle : List ( String, String )
topStyle =
    [ ( "flex", "0 0 auto" )
    , ( "padding", "20px" )
    , ( "margin", "30px" )
    , ( "border", "1px solid black" )
    , ( "box-shadow", "0 1px 2px rgba(0,0,0,0.5), 0 1px 10px rgba(0,0,0,0.5)" )
    , ( "background-color", "#101928" )
    ]


renderMessage : String -> Html Msg
renderMessage message =
    div [ style topStyle ]
        [ text message ]


render : String -> Dict.Dict String Int -> List AvailableDate -> Html Msg
render selectedDate whPerDay availableDates =
    div [ style topStyle ]
        [ (datesRender
            selectedDate
            (List.reverse (List.sortBy .date availableDates))
          )
        , div []
            [ renderWh whPerDay selectedDate ]
        ]


renderWh : Dict.Dict String Int -> String -> Html Msg
renderWh whPerDay date =
    let
        selectedDayWh =
            Dict.get date whPerDay
    in
        case selectedDayWh of
            Just wh ->
                let
                    kwh =
                        (toFloat wh) / 1000
                in
                    div []
                        [ div []
                            [ text ((toString wh) ++ " Wh") ]
                        , div []
                            [ text ((toString kwh) ++ " kWh") ]
                        , div
                            [ style
                                [ ( "font-size", "30px" )
                                , ( "padding", "10px 0" )
                                ]
                            ]
                            [ text ((toString (2 * kwh)) ++ " kWh (x2)") ]
                        ]

            Nothing ->
                text "No value given"


selectDecoder : Decode.Decoder Msg
selectDecoder =
    Decode.map DateChange targetValue


datesRender : String -> List AvailableDate -> Html Msg
datesRender selectedDate list =
    select [ on "change" selectDecoder ]
        (List.map
            (\d -> dateOptionRender d (d.date == selectedDate))
            list
        )


dateOptionRender : AvailableDate -> Bool -> Html Msg
dateOptionRender availableDate isSelected =
    let
        dateInt =
            availableDate.date
    in
        option
            [ (value dateInt)
            , selected isSelected
            ]
            [ text (dateToString dateInt) ]
