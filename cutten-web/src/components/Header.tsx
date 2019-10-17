import * as React from 'react';

import {
  Text
} from 'kingsbury/lib';

interface IHeaderProps {

}

class Header extends React.Component<IHeaderProps> {

  render() {

    return (
      <div>
        <div>
          <Text>Cutten</Text>
        </div>
        <div>
          <Text textType="h2">A WhatsApp chat analyzer</Text>
        </div>
        <div>
          <Text textType="h3">Instructions:</Text>
        </div>
      </div>
      
    )
  }
}

export default Header