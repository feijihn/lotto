import React from 'react';

export default class FullDescription extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 'less'
    }
  }
  handleTabClick = () => {
    console.log('lol');
  }
  render() {
    let description;
    if (this.state.tab === 'less') {
      description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia auctor suscipit. Aliquam felis quam, porttitor a diam vel, porttitor suscipit turpis. Nulla facilisi. Nulla facilisi. Sed volutpat blandit purus eget mattis. Nam tincidunt dapibus libero vel commodo. Proin aliquet porttitor mi, ac laoreet libero suscipit eu. Duis scelerisque ipsum nibh, sed porta quam vestibulum quis. Morbi vulputate vel sapien in posuere. Phasellus dapibus, nisi eget vehicula eleifend, ligula justo posuere lectus, in pulvinar ex urna sed neque. Phasellus sed elit nec purus tempus pharetra sit amet sed mauris. Maecenas sagittis sem eu elementum vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    } else if (this.state.tab === 'more') {
        description =
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia auctor suscipit. Aliquam felis quam, porttitor a diam vel, porttitor suscipit turpis. Nulla facilisi. Nulla facilisi. Sed volutpat blandit purus eget mattis. Nam tincidunt dapibus libero vel commodo. Proin aliquet porttitor mi, ac laoreet libero suscipit eu. Duis scelerisque ipsum nibh, sed porta quam vestibulum quis. Morbi vulputate vel sapien in posuere. Phasellus dapibus, nisi eget vehicula eleifend, ligula justo posuere lectus, in pulvinar ex urna sed neque. Phasellus sed elit nec purus tempus pharetra sit amet sed mauris. Maecenas sagittis sem eu elementum vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec venenatis lobortis lacinia. Quisque ac orci ut elit volutpat pulvinar vitae vitae magna. In sagittis ultrices sollicitudin. Aliquam vel pellentesque purus, eget finibus lorem. Praesent suscipit sollicitudin venenatis. Aliquam pellentesque quam ac ligula egestas ornare. In odio lorem, blandit nec nibh et, tincidunt porta ipsum. Etiam vitae finibus tortor, finibus facilisis sapien. Quisque semper, orci vitae eleifend eleifend, velit nunc imperdiet dui, quis auctor elit risus et felis. Cras at quam arcu. Cras suscipit nulla eget faucibus rutrum. Nam hendrerit faucibus pharetra. Phasellus quis erat finibus, commodo tellus vel, laoreet mi. Proin eu massa sed sapien cursus mollis sed at dui. Ut erat nisl, feugiat at nisi sed, posuere luctus justo. Cras vel lorem felis.'
    }
    return (
      <div className={'about-mechanics__description__full block'}>
        <div className={'tabs'}>
        <div className={this.state.tab === 'less' ? 'tab active' : 'tab'} onTouchTap={() => {
          this.setState({
            tab: 'less'
          });
        }}>
            <span>
              Less
            </span>
          </div>
          <div className={this.state.tab === 'more' ? 'tab active' : 'tab'} onTouchTap={() => {
            this.setState({
              tab: 'more'
            });
          }}>
            <span>
              More
            </span>
          </div>
        </div>
        <p>
          {description}
        </p>
      </div>
    );
  }
}
