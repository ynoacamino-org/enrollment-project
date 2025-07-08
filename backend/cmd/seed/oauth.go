package main

import (
	"log"

	"github.com/enrollment/gen/db"
	"github.com/enrollment/internal/ports"
	"github.com/jaswdr/faker"
	"golang.org/x/net/context"
)

const (
	GOOGLE_PROVIDER    string = "google"
	MICROSOFT_PROVIDER string = "microsoft"
)

const (
	NUM_ACCOUNTS int = 100
)

const (
	AVATAR_URL string = "https://ynoa-uploader.ynoacamino.site/uploads/1750016704_ACg8ocLnHIiNMcd-ltRxMAQZ6Qo1hKAeSyZsktQKBp5kNltpKDzlg4_q=s96-c.webp"
)

func createRandomAccount(faker faker.Faker) db.CreateAccountWithProviderNameParams {
	return db.CreateAccountWithProviderNameParams{
		Name:         faker.Person().Name(),
		Email:        faker.Internet().Email(),
		Surname:      faker.Person().LastName(),
		AvatarUrl:    AVATAR_URL,
		ProviderName: GOOGLE_PROVIDER,
		AccessToken:  faker.RandomStringWithLength(20),
		RefreshToken: faker.RandomStringWithLength(20),
	}
}

func seedOauthTables(ctx context.Context, oauthRepo ports.OauthRepositoryInterface) {
	faker := faker.New()

	log.Println("Seeding OAuth providers...")

	err := oauthRepo.CreateOauthProvider(ctx, GOOGLE_PROVIDER)
	if err != nil {
		log.Fatal(err)
	}
	err = oauthRepo.CreateOauthProvider(ctx, MICROSOFT_PROVIDER)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Seeding OAuth accounts...")

	// Developer accounts
	log.Println("Seeding developer accounts...")
	var devAccounts = []db.CreateAccountWithProviderNameParams{
		{
			Name:         "Luis Gustavo",
			Surname:      "Sequeiros Condori",
			Email:        "lsequeiros@unsa.edu.pe",
			AvatarUrl:    AVATAR_URL,
			ProviderName: GOOGLE_PROVIDER,
			AccessToken:  faker.RandomStringWithLength(20),
			RefreshToken: faker.RandomStringWithLength(20),
		},
		{
			Name:         "Yenaro Joel",
			Surname:      "Noa Camino",
			Email:        "ynoacamino@gmail.com",
			AvatarUrl:    AVATAR_URL,
			ProviderName: GOOGLE_PROVIDER,
			AccessToken:  faker.RandomStringWithLength(20),
			RefreshToken: faker.RandomStringWithLength(20),
		},
		{
			Name:         "Álvaro Raúl",
			Surname:      "Quispe Condori",
			Email:        "aquispecondo@unsa.edu.pe",
			AvatarUrl:    AVATAR_URL,
			ProviderName: GOOGLE_PROVIDER,
			AccessToken:  faker.RandomStringWithLength(20),
			RefreshToken: faker.RandomStringWithLength(20),
		},
	}

	for _, devAccount := range devAccounts {
		err = oauthRepo.CreateAccountWithProviderName(ctx, devAccount)
		if err != nil {
			log.Fatal(err)
		}
	}

	log.Println("Seeding random accounts...")

	for range NUM_ACCOUNTS {
		account := createRandomAccount(faker)
		err = oauthRepo.CreateAccountWithProviderName(ctx, account)
		if err != nil {
			log.Fatal(err)
		}
	}

	log.Println("Seeding completed successfully.")
}
