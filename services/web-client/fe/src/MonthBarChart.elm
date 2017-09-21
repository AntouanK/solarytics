module MonthBarChart exposing (render)

import Svg exposing (..)
import Svg.Attributes exposing (..)
import Time.Date as Date exposing (Date, date)
import Visualization.Axis as Axis exposing (defaultOptions)
import Visualization.Scale as Scale
    exposing
        ( BandConfig
        , BandScale
        , ContinuousScale
        , defaultBandConfig
        )


w : Float
w =
    900


h : Float
h =
    450


padding : Float
padding =
    60


dateToTickString : Date -> String
dateToTickString date =
    let
        ( d, m, y ) =
            Date.toTuple date
    in
    toString d ++ "/" ++ toString m


xScale : List ( Date, Float ) -> BandScale Date
xScale model =
    Scale.band
        { defaultBandConfig
            | paddingInner = 0.1
            , paddingOuter = 0.2
        }
        (List.map Tuple.first model)
        ( 0, w - 2 * padding )


yScale : Float -> ContinuousScale
yScale maxY =
    Scale.linear ( 0, maxY ) ( h - 2 * padding, 0 )


xAxis : List ( Date, Float ) -> Svg msg
xAxis model =
    Axis.axis
        { defaultOptions
            | orientation = Axis.Bottom
            , tickFormat = Just dateToTickString
        }
        (Scale.toRenderable (xScale model))


yAxis : Float -> Svg msg
yAxis maxY =
    Axis.axis
        { defaultOptions | orientation = Axis.Left, tickCount = 5 }
        (yScale maxY)


column : Float -> BandScale Date -> ( Date, Float ) -> Svg msg
column maxY xScale ( date, value ) =
    g [ class "column" ]
        [ rect
            [ x <| toString <| Scale.convert xScale date
            , y <| toString <| Scale.convert (yScale maxY) value
            , width <| toString <| Scale.bandwidth xScale
            , height <| toString <| h - Scale.convert (yScale maxY) value - 2 * padding
            ]
            []
        , text_
            [ x <| toString <| Scale.convert (Scale.toRenderable xScale) date
            , y <| toString <| Scale.convert (yScale maxY) value - 5
            , textAnchor "middle"
            ]
            [ text <| toString value ]
        ]


render : List ( Date, Float ) -> Float -> Svg msg
render timeSeries maxY =
    svg [ width (toString w ++ "px"), height (toString h ++ "px") ]
        [ Svg.style [] [ text """
            .column rect { fill: rgba(118, 214, 78, 0.8); }
            .column text { display: none; }
            .column:hover rect { fill: rgb(118, 214, 78); }
            .column:hover text { display: inline; }
          """ ]
        , g
            [ transform ("translate(" ++ toString (padding - 1) ++ ", " ++ toString (h - padding) ++ ")") ]
            [ xAxis timeSeries ]
        , g
            [ transform ("translate(" ++ toString (padding - 1) ++ ", " ++ toString padding ++ ")") ]
            [ yAxis maxY ]
        , g
            [ transform ("translate(" ++ toString padding ++ ", " ++ toString padding ++ ")"), class "series" ]
          <|
            List.map (column maxY (xScale timeSeries)) timeSeries
        ]
