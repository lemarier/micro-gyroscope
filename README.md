# gyroscope

Microservice to cache and expose my Gyroscope data.

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

**200**: Returns a list of projects as follows

```json
[
  {
    "steps":992000,
    "weight":"72.0",
    "weightUnits":"kg",
    "heartRate":"77",
    "heartRateUnits":"bpm"
  }
]
```

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Follow the [usage section](#usage)
3. Start making changes and open a pull request once they're ready!
