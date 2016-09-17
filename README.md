# comparison
compare prices from uber and lyft. this is totally against both uber/lyft API TOS. use with caution!

## set up
init your env variables with your API keys!

```bash
  export UBER_SERVER_TOKEN=YOUR_UBER_TOKEN
  export LYFT_CLIENT_ID=YOUR_LYFT_CLIENT_ID
  export LYFT_CLIENT_SECRET=YOUR_LYFT_CLIENT_SECRET
```

then just `npm install && npm run` and you're good to go

## api interface

`GET /` 

everything is a query param. set these query params and you're good to go

`start_latitude`: your start latitude

`start_longitude`: your start longitude

`end_latitude`: your end latitude

`end_longitude`: your end longitude

`seat_count`: seat count for requesting uberpools. can be either `1` or `2`. does nothing for lyft.

this will return an object with 2 keys, `lyft` and `uber`. currently it just returns the standard api response for each. no transformations are applied yet. you can read about those api responses here ([uber[(https://developer.uber.com/docs/rides/api/v1-estimates-price), [lyft](https://developer.lyft.com/docs/availability-cost)).

## license

mit
