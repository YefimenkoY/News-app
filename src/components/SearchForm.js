import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import { Input } from 'antd';
import { SEARCH_FORM } from '../constants/lists';

@reduxForm({
  form: SEARCH_FORM,
  destroyOnUnmount: false
})

class SearchForm extends Component {
  
  componentDidMount() {
    this.input.input.focus();
  }
  
  getInputComp = ({input, meta, ...rest}) => (
    <Input.Search
      ref={e => this.input = e}
      {...input} {...rest}
      className='search-input'
      placeholder="Search..."
      onChange={e => this.onChange(e, input)}
    />
  )
  
  onChange = (e, input) => {
    const { callSubmit, clearBookList, resetStartIndex, loading } = this.props;
    
    input.onChange(e);
    if (loading) return;
    if (this.timer) clearTimeout(this.timer);
    
    clearBookList();
    resetStartIndex();
    
    this.timer = setTimeout(() => {
      callSubmit(SEARCH_FORM);
      this.timer = false;
    }, 800);
  };
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name='searchInput'
          component={this.getInputComp}
        />
      </form>
    )
  }
}

export default SearchForm;