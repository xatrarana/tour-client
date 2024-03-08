export const places = [
    { 
        "points": {
            "coordinates": [
                123.456,
                78.901
            ],
            "type": "Point"
        },
    }
]

const parse = JSON.parse(JSON.stringify(places))

export type TPlace = (typeof parse)[number]