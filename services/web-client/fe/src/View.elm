module View exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Types exposing (..)


root : Model -> Html Msg
root model =
    div []
        [ case model.availableDates of
            Loading ->
                text "Loading"

            Failed error ->
                div [ class "alert alert-danger" ]
                    [ text (toString error) ]

            Succeed availableDates ->
                div []
                    [
                      h1 [ style [ ] ]
                          [ text "Available dates ..." ],
                          (datesRender
                              (List.reverse
                                  (List.sortBy
                                      .date availableDates
                                  )
                              )
                          )
                    ]
        ]


datesRender : List AvailableDate -> Html Msg
datesRender list =
    select [] (List.map dateRender list)

dateRender : AvailableDate -> Html Msg
dateRender availableDate =
    option [(value availableDate.date)]
        [ text (Debug.log "Rendering" availableDate.date) ]
