import React, { useState } from 'react';
import createCrud from './../../utils/CrudGenerator';
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from 'prism-react-renderer/themes/synthwave84';

type Column = {
    primaryKey?: boolean
    name: string
    type: 'INTEGER' | 'VARCHAR'
    size?: number
}


const foo = createCrud({
    name: 'tb_destinatarios',
    columns: [
        {
            primaryKey: true,
            name: 'id',
            type: 'INTEGER'
        },
        {
            name: 'nome',
            type: 'VARCHAR',
            size: 100
        },
        {
            name: 'email',
            type: 'VARCHAR',
            size: 100
        },
        {
            name: 'telefone',
            type: 'VARCHAR',
            size: 100
        }
    ],
})


const Home: React.FC = () => {

    const [nome, setNome] = useState('');
    // const [columns, setColumns] = useState<Column[]>([] as Column[]);
    const [code, setCode] = useState('');

    const handleOnClick = () => {
        setCode(createCrud(nome));
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflowX: 'hidden' }} >

            <div>
                {/* <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder='CREATE TABLE ...' /> */}
                <textarea cols={50} rows={10} placeholder={'CREATE TABLE ...'} onChange={(e) => setNome(e.target.value)} >  </textarea>
                <button onClick={() => handleOnClick()}>Criar CRUD</button> 
            </div>

            <div> 
                <Highlight {...defaultProps} code={code} theme={theme} language="jsx">
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={className} style={style}>
                            {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })}>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>

        </div>
    )
}





export default Home;