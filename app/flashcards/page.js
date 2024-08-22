'use client'

import { useUser } from '@clerk/nextjs'
import { use, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()
    const [flipped, setFlipped] = useState({})

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return

            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []
            console.log(collections)
            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [search, user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}