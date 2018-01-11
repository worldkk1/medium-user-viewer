package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	medium "github.com/medium/medium-sdk-go"
	"github.com/rs/cors"
)

type ResponseResult struct {
	Code string `json:"code,omitempty"`
	Desc string `json:"desc,omitempty"`
}

var responseResult []ResponseResult

type MediumResponse struct {
	URL string `json:"url,omitempty"`
}

var client = medium.NewClient("bfd5f510809e", "988e2718d4fe4cb78fd936333f5e4ee73b40bb59")
var redirectURL string

func main() {
	redirectURL = "http://127.0.0.1:4200/callback/medium"

	router := mux.NewRouter()
	responseResult = append(responseResult, ResponseResult{Code: "200", Desc: "KK"})
	router.HandleFunc("/get", getHandle).Methods("GET")

	router.HandleFunc("/api/medium/init", mediumInit).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/medium/user", getMediumUser).Methods("POST", "OPTIONS")

	router.Headers("Content-Type", "application/json")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Content-Type"},
	})
	handler := c.Handler(router)
	// headersAllow := handlers.AllowedHeaders([]string{"Content-Type"})
	// originsOk := handlers.AllowedOrigins([]string{"*"})
	// log.Fatal(http.ListenAndServe(":3000", handlers.CORS()(router)))
	log.Fatal(http.ListenAndServe(":3000", handler))
}

func getHandle(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(responseResult)
}

func mediumInit(w http.ResponseWriter, r *http.Request) {
	url := client.GetAuthorizationURL("secretstate", redirectURL,
		medium.ScopeBasicProfile, medium.ScopePublishPost)

	mediumResponse := MediumResponse{URL: url}

	// w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(mediumResponse)
}

func getMediumUser(w http.ResponseWriter, r *http.Request) {
	// r.HeadersRegexp("Content-Type", "application/json")
	fmt.Println("getMediumUser")
	params := mux.Vars(r)
	fmt.Println("this val:: " + params["authen_code"])
	// w.Header().Set("Access-Control-Allow-Origin", "*")
	// w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	json.NewEncoder(w).Encode(responseResult) // test
}
