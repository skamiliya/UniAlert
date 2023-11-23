import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Button } from 'semantic-ui-react'
import { decrement, increment, incrementByAmount } from './testSlice';
import { openModal } from '../../common/modals/modalSlice';

export default function Scratch() {
  const { data } = useAppSelector(state => state.test)
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Scratch page</h1>
      <h2>The data is: {data} </h2>
      <Button onClick={() => dispatch(increment())} color='green' content='increment' />
      <Button onClick={() => dispatch(decrement())} color='red' content='decrement' />
      <Button onClick={() => dispatch(incrementByAmount(5))} color='blue' content='increment by 5' />
      <Button
        onClick={() => dispatch(openModal({ type: 'TestModal', data: data }))}
        color='blue' content='Open Modal' />
    </div>

  )
}
