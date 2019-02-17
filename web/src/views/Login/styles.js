import styled from 'styled-components'
import sizes from '../../styles/media'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;

  @media ${sizes.md} {
    width: 441px;
    padding: 30px;
  }
`

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`

export const Button = styled.button`
  background-color: #ff5a5f;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 4px;
`

export const InputWrapper = styled.div`
  border-radius: 4px;
  width: 100%;
  margin: 20px 0;
`

export const Input = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  outline: none;
`

export const Title = styled.span`
  font-weight: bold;
`
