import React, { Component, Fragment } from 'react';
import NoImg from '../../images/no-img.png';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import './MeowSkeleton.css';

export default function MeowSkeleton(props) {
  console.log('meowSkeleton called');
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className='skeletonCard' key={index}>
      <CardMedia className='cover' image={NoImg} />
      <CardContent className='cardContent'>
        <div className='userName' />
        <div className='date' />
        <div className='fullLine' />
        <div className='fullLine' />
        <div className='fullLine' />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
}
