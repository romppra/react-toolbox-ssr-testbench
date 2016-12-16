import React from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import style from '../style.css';

const initialState = {
  progress: 0,
  buffer: 10
};

class ProgressBarTest extends React.Component {
  state = initialState;

  render () {
    return (
      <section>
        <h5>Progress bars</h5>
        <p style={{margin: '10px auto'}}>Determinate</p>
        <ProgressBar mode='determinate' value={this.state.progress} buffer={this.state.buffer}/>
        <p style={{margin: '10px auto'}}>Indeterminate...</p>
        <ProgressBar mode='indeterminate'/>
        <p style={{margin: '10px auto'}}>Circular</p>
        <ProgressBar type='circular' mode='indeterminate'/>
        <p style={{margin: '10px auto'}}>Circular with custom size</p>
        <ProgressBar className={style.customSizedProgress} type='circular' mode='indeterminate' theme={style} />
      </section>
    );
  }
}

export default ProgressBarTest;
