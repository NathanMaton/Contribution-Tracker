#!/bin/bash

while read p; do
  echo 'romney' > text/`echo $p`.txt
  cat ./html/$p | grep docdate | awk -F'>' '{ print $7 }' | awk -F'<' '{ print $1 }' >> text/`echo $p`.txt
  cat ./html/$p | grep displaytext | grep -v 'font-size' >> text/`echo $p`.txt
done < "${1:-/proc/${$}/fd/0}"