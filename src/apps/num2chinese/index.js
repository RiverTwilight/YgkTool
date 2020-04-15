import React from 'react'
import mdui from 'mdui'

import ClipboardJS from 'clipboard'
import num2chinese from './engine'
import Input from '../../utils/Component/Input.tsx'

const Result = props =>{
    const { src } = props;
    if(!src)return null
    return(
      <>       
            <div disabled={true} id="input" data-clipboard-text={src} className="mdui-textfield">
                <input value={src} className="mdui-textfield-input" type="text"/>
            </div>
            <img src={src} className="mdui-img-fluid"/>
      </>
    )
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input:'',
            res:''
        }
    }
    componentDidMount(){
        clipboard && clipboard.destroy();
        var clipboard = new ClipboardJS('#becopy');
        clipboard.on('success', e=> {
          mdui.snackbar({message:'已复制'})
          e.clearSelection();
        })
    }
    render(){
        const { input, res } = this.state
    	return (
    		<>
                <Input
                    onValueChange={newText=>{                        
                        var cal = new num2chinese(newText); 
                        var result = (newText === '')?'':cal.calDirect()                     
                        this.setState({
                            input:newText,
                            res:result
                        })
                    }}
                    autoFocus
                    header="输入小写数字"
                    icon="attach_money"
                    type="number"
                    value={input}
                />
                <p 
                    style={{display:(res === '')?'none':'block'}}
                    id="becopy" data-clipboard-text={res} 
                    className="mdui-text-center mdui-typo-title">
                    {res}
                    <button className="mdui-btn-icon mdui-btn"><i class="mdui-icon material-icons">&#xe14d;</i></button>
                </p>          
            </>
    	)
    }
}

export default Ui