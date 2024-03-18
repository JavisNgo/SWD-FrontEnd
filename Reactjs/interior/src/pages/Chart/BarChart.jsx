import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
      "country": "AD",
      "hot dog": 24,
      "hot dogColor": "hsl(121, 70%, 50%)",
      "burger": 86,
      "burgerColor": "hsl(9, 70%, 50%)",
      "sandwich": 31,
      "sandwichColor": "hsl(280, 70%, 50%)",
      "kebab": 48,
      "kebabColor": "hsl(227, 70%, 50%)",
      "fries": 97,
      "friesColor": "hsl(17, 70%, 50%)",
      "donut": 196,
      "donutColor": "hsl(293, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 19,
      "hot dogColor": "hsl(158, 70%, 50%)",
      "burger": 200,
      "burgerColor": "hsl(274, 70%, 50%)",
      "sandwich": 54,
      "sandwichColor": "hsl(132, 70%, 50%)",
      "kebab": 31,
      "kebabColor": "hsl(304, 70%, 50%)",
      "fries": 19,
      "friesColor": "hsl(22, 70%, 50%)",
      "donut": 177,
      "donutColor": "hsl(113, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 185,
      "hot dogColor": "hsl(248, 70%, 50%)",
      "burger": 163,
      "burgerColor": "hsl(334, 70%, 50%)",
      "sandwich": 52,
      "sandwichColor": "hsl(178, 70%, 50%)",
      "kebab": 123,
      "kebabColor": "hsl(315, 70%, 50%)",
      "fries": 25,
      "friesColor": "hsl(144, 70%, 50%)",
      "donut": 189,
      "donutColor": "hsl(30, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 85,
      "hot dogColor": "hsl(235, 70%, 50%)",
      "burger": 119,
      "burgerColor": "hsl(160, 70%, 50%)",
      "sandwich": 27,
      "sandwichColor": "hsl(178, 70%, 50%)",
      "kebab": 196,
      "kebabColor": "hsl(118, 70%, 50%)",
      "fries": 44,
      "friesColor": "hsl(357, 70%, 50%)",
      "donut": 28,
      "donutColor": "hsl(303, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 140,
      "hot dogColor": "hsl(5, 70%, 50%)",
      "burger": 198,
      "burgerColor": "hsl(170, 70%, 50%)",
      "sandwich": 137,
      "sandwichColor": "hsl(292, 70%, 50%)",
      "kebab": 78,
      "kebabColor": "hsl(24, 70%, 50%)",
      "fries": 55,
      "friesColor": "hsl(326, 70%, 50%)",
      "donut": 24,
      "donutColor": "hsl(176, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 119,
      "hot dogColor": "hsl(103, 70%, 50%)",
      "burger": 152,
      "burgerColor": "hsl(90, 70%, 50%)",
      "sandwich": 59,
      "sandwichColor": "hsl(150, 70%, 50%)",
      "kebab": 136,
      "kebabColor": "hsl(37, 70%, 50%)",
      "fries": 7,
      "friesColor": "hsl(31, 70%, 50%)",
      "donut": 178,
      "donutColor": "hsl(269, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 152,
      "hot dogColor": "hsl(354, 70%, 50%)",
      "burger": 132,
      "burgerColor": "hsl(94, 70%, 50%)",
      "sandwich": 163,
      "sandwichColor": "hsl(287, 70%, 50%)",
      "kebab": 144,
      "kebabColor": "hsl(324, 70%, 50%)",
      "fries": 64,
      "friesColor": "hsl(54, 70%, 50%)",
      "donut": 185,
      "donutColor": "hsl(90, 70%, 50%)"
    }
  ]
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart = ({ /* see data tab */ }) => (
    <ResponsiveBar
        data={data}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.2}
        innerPadding={3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '1.6'
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
)
export default BarChart