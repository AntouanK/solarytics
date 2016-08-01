module LineChart exposing (render)
import Svg exposing (..)
import Svg.Attributes exposing (..)
import Html.Attributes exposing (style)


render : List Int -> Svg.Svg a
render values =
    let maxHeight = 150
    in
    let mappedStrings =
        List.map
            (\(i,val) ->
                (toString (i * 10)) ++ "," ++ (toString (maxHeight - val))
            )
            (List.indexedMap (,) values)
    in
    let pointsStr =
        -- "20,100 40,60 70,80 100,20"
        List.foldl (\a b -> (a ++ " " ++ b)) "" mappedStrings
    in
    svg [ viewBox ("0 0 310 " ++ (toString maxHeight))
        , Html.Attributes.style [("border-bottom", "1px white solid")]
        ]
        [ polyline  [ fill "none", stroke "white", points pointsStr ]
                    []
        ]
