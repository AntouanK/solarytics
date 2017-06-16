module MonthView exposing (..)

import Types exposing (..)
import Dict
import String
import Html exposing (..)
import Html.Events exposing (on, targetValue)
import Html.Attributes exposing (style, value, selected)
import Json.Decode as Decode
import LineChart exposing (render)


topStyle : List ( String, String )
topStyle =
    [ ( "flex", "1 0 400px" )
    , ( "padding", "20px" )
    , ( "margin", "30px" )
    , ( "display", "flex" )
    , ( "flex-direction", "column" )
    , ( "border", "1px solid black" )
    , ( "box-shadow", "0 1px 2px rgba(0,0,0,0.5), 0 1px 10px rgba(0,0,0,0.5)" )
    , ( "background-color", "#101928" )
    ]


render : List MonthData -> Dict.Dict String Int -> String -> Html Msg
render monthDataList whPerDay selectedMonth =
    let
        monthWhPerDay =
            let
                keys =
                    List.filter
                        (\( key, value ) -> String.startsWith selectedMonth key)
                        (Dict.toList whPerDay)
            in
                List.map (\( key, value ) -> ((value * 2) // 1000)) keys
    in
        let
            max =
                case (List.maximum monthWhPerDay) of
                    Just m ->
                        m

                    Nothing ->
                        0
        in
            let
                min =
                    case (List.minimum monthWhPerDay) of
                        Just m ->
                            m

                        Nothing ->
                            0
            in
                let
                    total =
                        List.foldl (+) 0 monthWhPerDay
                in
                    let
                        totalDays =
                            List.length monthWhPerDay
                    in
                        div [ style topStyle ]
                            [ renderSelectMonth (List.reverse monthDataList) selectedMonth

                            -- , text ("Total days: " ++ )
                            , small [] [ text ("0 - 150kWh  |  values are x2") ]
                            , LineChart.render monthWhPerDay
                            , div [] [ text ("Max: " ++ (toString max) ++ "kWh") ]
                            , div [] [ text ("Min: " ++ (toString min) ++ "kWh") ]
                            , div [] [ text ("Total: " ++ (toString total) ++ "kWh") ]
                            , div [] [ text ("Days: " ++ (toString totalDays)) ]
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
                    (monthToString m.month) ++ " " ++ (toString m.year)
            in
                option
                    [ (value m.key)
                    , selected (selectedMonth == m.key)
                    ]
                    [ text textContent ]
    in
        select [ on "change" selectDecoder ]
            (List.map monthToOption list)
