
export const tableColumnRiver = [
    {
        title: '河道名称',
        dataIndex: 'rvnm',
        ellipsis: true,
    },
    {
        title: '测站名称',
        dataIndex: 'stnm',
        ellipsis: true,
    },
    {
        title: '行政区划',
        dataIndex: 'areacode',
        ellipsis: true,
    },
    {
        title: '时间',
        dataIndex: 'tm',
        ellipsis: true,
    },
    {
        title: '水位(m)',
        dataIndex: 'z',
        ellipsis: true,
    },
    {
        title: '警戒水位(m)',
        dataIndex: 'waning',
        ellipsis: true,
    },
]
export const tableColumnWater = [
    {
        title: '序号',
        dataIndex: 'number',
        ellipsis: true,
    },
    {
        title: '名称',
        dataIndex: 'name',
        ellipsis: true,
    },
    {
        title: '详细位置',
        dataIndex: 'address',
        ellipsis: true,
    },
    {
        title: '积水深度(cm)',
        dataIndex: 'z',
        ellipsis: true,
        render: z => z != "-" ? (z * 100).toFixed(1) : "-",
    },
]
