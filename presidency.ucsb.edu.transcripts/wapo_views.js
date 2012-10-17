{
   "_id": "_design/lists",
   "_rev": "3-debf9234f2bf26d9e617ea7c60409a16",
   "language": "javascript",
   "views": {
       "all": {
           "map": "function(doc) { emit(null, doc) }"
       },
       "by_speaker_person_date": {
           "map": "function (doc) { doc.calais.persons.forEach(function (peep) { emit([doc.speaker, peep, doc.date[0], doc.date[1], doc.date[2]], doc.date); }); };"
       },
       "by_speaker_organization_date": {
           "map": "function (doc) { doc.calais.organizations.forEach(function (org) { emit([doc.speaker, org, doc.date[0], doc.date[1], doc.date[2]], doc.date); }); };"
       },
       "by_speaker_date": {
           "map": "function(doc) { var arr = []; arr[0] = doc.speaker; arr[1] = doc.date[0]; arr[2] = doc.date[1]; arr[3] = doc.date[2]; emit(arr, doc.transcript) }"
       },
       "by_date_speaker": {
           "map": "function(doc) { var arr = []; arr[0] = doc.date[0]; arr[1] = doc.date[1]; arr[2] = doc.date[2]; arr[3] = doc.speaker; emit(arr, doc.transcript) }"
       }
   }
}
