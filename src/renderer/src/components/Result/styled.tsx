// npm install styled-components
import styled from 'styled-components'
// npm i -D tailwind-styled-components
// import tw from 'tailwind-styled-components'

interface Props {
  isActive: boolean
}

export const Div = styled.div<Props>`
  background-color: ${(props) => (props.isActive ? 'pink' : '')};
  color: ${(props) => (props.isActive ? 'white' : '')};
  padding: 2px;
  margin-bottom: 5px;
  border-radius: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
