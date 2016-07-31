module MyDate exposing (..)
import String
import Types exposing (..)
import Dict



dateStringToDate : String -> Maybe Date
dateStringToDate dateString =
    let dateInt = String.toInt dateString
    in
    case dateInt of
      Err e ->
        Nothing
      Ok dateInt ->
        let date = dateInt % 100
        in
        let month = ((dateInt - date) // 100) % 100
        in
        let year = 2000 + (((dateInt - (month * 100) - date)) // 10000)
        in
        Just    { day = date
                , month = stringToMonth (monthIntToText month)
                , year = year
                }


dateToString : String -> String
dateToString dateString =
  let date = dateStringToDate dateString
  in
  case date of
    Nothing ->
      "Invalid date number. "
    Just date ->
      (toString date.day) ++ " "
      ++ (monthToString date.month) ++ " "
      ++ (toString date.year)


datesToMonthdata : List AvailableDate -> List MonthData
datesToMonthdata dates =
    let sortDateToMonthData date dict =
        let yymm = (date - (date % 100)) // 100
        in
        let key = (toString yymm)
        in
        let monthData =
            { totalDays = 0
            , month = (stringToMonth (monthIntToText (yymm % 100)))
            , year = 2000 + ((yymm - (yymm % 100)) // 100)
            , daysData = []
            , key = key
            }
        in
        let d1 = (Debug.log "key" (toString yymm)) in
        Dict.insert
            key
            monthData
            dict
    in
    let toIntWithDefault str =
        Result.withDefault 0 (String.toInt str)
    in
    let dateInts = List.map toIntWithDefault (List.map .date dates)
    in
    let dict = List.foldl sortDateToMonthData (Dict.fromList []) dateInts
    in
    let d1 = List.map (\key -> (Debug.log "key" key))(Dict.keys dict) in
    Dict.values dict
