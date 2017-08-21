# gyroscope

Microservice to cache and expose my HealthKit data from [gyrosco.pe](https://gyrosco.pe)

## Usage

Simply install the dependencies:

```bash
yarn install
```

And run the server:

```bash
yarn dev
```

## API

### GET /

**200**: Returns a list of  gyrosco.pe data as follows

```json
[
  {
    "steps": 1000000,
    "kms": 762,
    "weight": 72,
    "weightUnits": "kg",
    "heartRate": 65,
    "heartRateUnits": "bpm"
  }
]
```

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Follow the [usage section](#usage)
3. Start making changes and open a pull request once they're ready!
