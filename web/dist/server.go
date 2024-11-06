package main

import (
	"fmt"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)
	fmt.Printf("running on localhost:1234\n")
	http.ListenAndServe(":1234", nil)
}
