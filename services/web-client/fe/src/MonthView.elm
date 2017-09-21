module MonthView exposing (..)

import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (selected, style, value)
import Html.Events exposing (on, targetValue)
import Json.Decode as Decode
import MonthBarChart
import Time.Date as Date
import Types exposing (..)


topStyle : List ( String, String )
topStyle =
    [ ( "flex", "1 0 400px" )
    , ( "padding", "20px" )
    , ( "margin", "30px" )
    , ( "display", "flex" )
    , ( "flex-direction", "column" )
    , ( "border", "1px solid black" )
    , ( "box-shadow", "0 1px 2px rgba(0,0,0,0.5), 0 1px 10px rgba(0,0,0,0.5)" )
    , ( "background-color", "#8792a5" )
    ]


render : List MonthData -> Dict String Int -> String -> Html Msg
render monthDataList whPerDay selectedMonth =
    let
        datesWhTuplesForMonth =
            List.map (\( key, value ) -> ( key, value * 2 )) <|
                List.filter
                    (\( key, value ) -> String.startsWith selectedMonth key)
                    (Dict.toList whPerDay)

        monthWhPerDay =
            List.map Tuple.second datesWhTuplesForMonth

        --List.map (\( key, value ) -> (value * 2) // 1000) keys
        toDateWhTuple ( yymmdd, value ) =
            let
                ddResult =
                    String.toInt <|
                        String.slice 4 6 yymmdd

                mmResult =
                    String.toInt <|
                        String.slice 2 4 yymmdd

                yyResult =
                    String.toInt <|
                        String.slice 0 2 yymmdd
            in
            case ( ddResult, mmResult, yyResult ) of
                ( Ok dd, Ok mm, Ok yy ) ->
                    ( Date.date dd mm (2000 + yy), toFloat value )

                _ ->
                    ( Date.date 1 1 1900, 0 )

        timeSeries =
            List.map toDateWhTuple datesWhTuplesForMonth

        max =
            toFloat <|
                Maybe.withDefault 0 <|
                    List.maximum monthWhPerDay

        min =
            toFloat <|
                Maybe.withDefault 0 <|
                    List.minimum monthWhPerDay

        total =
            List.foldl (+) 0 monthWhPerDay

        totalDays =
            List.length monthWhPerDay
    in
    div [ style topStyle ]
        [ renderSelectMonth (List.reverse monthDataList) selectedMonth

        -- , text ("Total days: " ++ )
        , small [] [ text "0 - 150kWh  |  values are x2" ]
        , MonthBarChart.render timeSeries max
        , div [] [ text ("Max: " ++ toString (max / 1000) ++ "kWh") ]
        , div [] [ text ("Min: " ++ toString (min / 1000) ++ "kWh") ]
        , div [] [ text ("Total: " ++ toString (total // 1000) ++ "kWh") ]
        , div [] [ text ("Days: " ++ toString totalDays) ]
        ]


selectDecoder : Decode.Decoder Msg
selectDecoder =
    Decode.map MonthViewSelect targetValue


renderSelectMonth : List MonthData -> String -> Html Msg
renderSelectMonth list selectedMonth =
    let
        monthToOption m =
            let
                textContent =
                    monthToString m.month ++ " " ++ toString m.year
            in
            option
                [ value m.key
                , selected (selectedMonth == m.key)
                ]
                [ text textContent ]
    in
    select [ on "change" selectDecoder ]
        (List.map monthToOption list)
