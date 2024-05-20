import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, Table, TableColumnType } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import Highlighter from 'react-highlight-words';
interface props {
    data: Array<any>;
    cols: Array<any>;
}

/**
         * DataTable componenti kendisine yolladığınız cols ve data değerlerini alır, bunları kullanarak "filtreleme" özelliğine sahip bir tablo gösterir.
         * tablo kolonlarını belirten cols Array'i "render" özelliğine sahiptir. 
         */
const DataTable = (props: props) => {
        
        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef<InputRef>(null);
      
        
      
        const handleSearch = (
          selectedKeys: string[],
          confirm: FilterDropdownProps['confirm'],
          dataIndex: any,
        ) => {
          confirm();
          setSearchText(selectedKeys[0]);
          setSearchedColumn(dataIndex);
        };
      
        const handleReset = (clearFilters: () => void) => {
          clearFilters();
          setSearchText('');
        };

        interface searchPropsType {
            dataIndex : any;
            title: string;
          } 
        
          const getColumnSearchProps = (props: searchPropsType): TableColumnType<any> => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
              <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                  ref={searchInput}
                  placeholder={`${props.title} Ara`}
                  value={selectedKeys[0]}
                  onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={() => handleSearch(selectedKeys as string[], confirm, props.dataIndex)}
                  style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                  <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys as string[], confirm, props.dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                  >
                    Ara
                  </Button>
                  <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                  >
                    Sıfırla
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      confirm({ closeDropdown: false });
                      setSearchText((selectedKeys as string[])[0]);
                      setSearchedColumn(props.dataIndex);
                    }}
                  >
                    Filtrele
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      close();
                    }}
                  >
                    Kapa
                  </Button>
                </Space>
              </div>
            ),
            filterIcon: (filtered: boolean) => (
              <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
            ),
            onFilter: (value, record) =>
              record[props.dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
              if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
              }
            },
            render: (text) =>
              searchedColumn === props.dataIndex ? (
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[searchText]}
                  autoEscape
                  textToHighlight={text ? text.toString() : ''}
                />
              ) : (
                text
              ),
          });

          const editCol = (col: any) => {

            return {
                ...col,
                ...getColumnSearchProps({dataIndex:col.dataIndex ,title: col.title}),
            }
          }

          const searchableCols = props.cols.map(editCol);
          
          return <Table dataSource={props.data} columns={searchableCols} />

}

export default DataTable