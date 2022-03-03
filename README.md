# html-redirections

Generate [HTML redirections](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections#html_redirections) files from a JSON with redirects. See [blog post](https://dev.to/iamandrewluca/next-js-universal-and-nuxt-js-static-redirects-3cl6)

```shell
npx html-redirections example-array.json dist
```

A single redirect in JSON file has this type:

```ts
type Redirect = {
    from: string
    to: string
    delay?: number
    meta?: [
        {
            name: string
            content: string
        }
    ]
}
```