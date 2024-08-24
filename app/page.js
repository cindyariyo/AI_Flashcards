'use client'

import { AppBar, Button, Box, Typography, Grid, Toolbar } from '@mui/material';
//import Head from 'next/head'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
  const handleSubmit = async (plan) => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
      body: JSON.stringify({ plan })
    })
    const checkoutSessionJson = await checkoutSession.json()

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }

  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 2 }}>
            FlashWiz
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to FlashWiz 🧙🏽
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>
      <Box sx={{ my: 8, textAlign: 'center', ml: 2, mr: 2}} >
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        <Grid container spacing={2} >
          {/* Feature items */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography> Simply input your text and let our software do the rest. Creating flashcards has never been easier!</Typography>
          </Grid>
          <Grid item xs={12} md={4} >
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography> Our AI intelligently breaks down your text into concise flashcards, perfect for studying</Typography>
          </Grid>
          <Grid item xs={12} md={4} >
            <Typography variant="h6">Accessible Anywhere</Typography>
            <Typography> Access your flashcards from any device, at any time. Study on the go with ease</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center', ml: 2, mr: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom
              >Basic</Typography>
              <Typography variant="h6" gutterBottom
              >$5/month</Typography>
              <Typography> Access to basic flashcard features and limited storage</Typography>
              <Button variant="contained" color="primary" onClick={() => handleSubmit('basic')} sx={{ mt: 2 }}
              >Choose Basic</Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom
              >Pro 🚀</Typography>
              <Typography variant="h6" gutterBottom
              >$10/month</Typography>
              <Typography> Unlimited flashcards and storage, with priority support</Typography>
              <Button variant="contained" color="primary" onClick={() => handleSubmit('pro')} sx={{ mt: 2 }}
              >Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
