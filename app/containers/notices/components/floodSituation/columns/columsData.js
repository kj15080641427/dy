
export const tableColumnRiver = [
    {
        title: '河道名称',
        dataIndex: 'rvnm',
        ellipsis: true,
        className:'table-title-column'
    },
    {
        title: '测站名称',
        dataIndex: 'stnm',
        ellipsis: true,
        className:'table-title-column'
    },
    {
        title: '行政区划',
        dataIndex: 'areacode',
        ellipsis: true,
        className:'table-title-column'
    },
    {
        title: '时间',
        dataIndex: 'tm',
        ellipsis: true,
        className:'table-title-column'
    },
    {
        title: '水位(m)',
        dataIndex: 'z',
        ellipsis: true,
        className:'table-title-column'
    },
    {
        title: '警戒水位(m)',
        dataIndex: 'waning',
        ellipsis: true,
        className:'table-title-column'
    },
]
export const tableColumnWater = [
    {
        title: '序号',
        dataIndex: 'number',
        ellipsis: true,
        className:'table-title-column'
    },
    {
        title: '名称',
        dataIndex: 'name',
        ellipsis: true,
        className:'table-title-column'
    },
    {
        title: '详细位置',
        dataIndex: 'address',
        ellipsis: true,
        className:'table-title-column'
    },
    {
        title: '积水深度(cm)',
        dataIndex: 'z',
        render: z => z != "-" ? (z * 100).toFixed(1) : "-",
        className:'table-title-column'
        // sorter: (a, b) => a.z - b.z,
        // defaultSortOrder: 'descend'
    },
]
