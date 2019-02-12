import React, {Component} from 'react';

// redux
import { connect } from 'react-redux'

// Conponents
import LoadingComponent from '../components/LoadingComponent'

class LoadMoreContainer extends Component {

  render(){
    const { isFetching } = this.props.assets
    return(
      isFetching && <LoadingComponent />
    )
  }

}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(LoadMoreContainer)
