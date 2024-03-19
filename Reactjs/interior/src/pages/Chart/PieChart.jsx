import { ResponsivePie } from "@nivo/pie" 


const PieChart = () => {
    const data = [
        {
          "id": "Living room",
          "label": "Living",
          "value": 394,
          "color": "hsl(163, 70%, 50%)"
        },
        {
          "id": "Other",
          "label": "Other",
          "value": 272,
          "color": "hsl(279, 70%, 50%)"
        },
        {
          "id": "Dining room",
          "label": "Dining",
          "value": 467,
          "color": "hsl(2, 70%, 50%)"
        },
        {
          "id": "Office",
          "label": "Office",
          "value": 291,
          "color": "hsl(314, 70%, 50%)"
        },
        {
          "id": "Bedroom",
          "label": "Bedroom",
          "value": 496,
          "color": "hsl(92, 70%, 50%)"
        }
      ]
    return(
        <>
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.45}
        padAngle={2}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0.2'
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={13}
        arcLinkLabelsTextColor="#38801e"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '2.9'
                ]
            ]
        }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </>
    )
}
export default PieChart