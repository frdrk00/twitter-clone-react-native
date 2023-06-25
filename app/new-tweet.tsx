import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTweet } from '../lib/api/tweets'

const user = {
  id: 'u1',
  username: 'VadimNotJustDev',
  name: 'Vadim',
  image:
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
}

const NewTweet = () => {
  const [text, setText] = useState('')
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      queryClient.setQueriesData(['tweets'], (existingTweets) => [
        data,
        ...existingTweets,
      ])
    },
  })

  const onTweetPress = async () => {
    /* console.warn('Posting the tweet:', text) */

    try {
      await mutateAsync({ content: text })

      setText('')
      router.back()
    } catch (error) {
      console.log('Error: ', error.message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Link href="../" style={{ fontSize: 18 }}>
            Cancel
          </Link>
          {isLoading && <ActivityIndicator />}
          <Pressable onPress={onTweetPress} style={styles.button}>
            <Text style={styles.buttonText}>Tweet</Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Image src={user.image} style={styles.image} />
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Whats happening?"
            multiline
            numberOfLines={5}
            style={{ flex: 1 }}
          />
        </View>

        {isError && <Text>Error: {error.message}</Text>}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1C9BF0',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 10,
  },
})

export default NewTweet
