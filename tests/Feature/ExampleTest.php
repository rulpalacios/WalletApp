<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Wallet;
use App\Transfer;

class ExampleTest extends TestCase
{

    use RefreshDatabase;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetWallet()
    {
        $wallet = factory(Wallet::class)->create();
        $transfers = factory(Transfer::class, 3)->create([
            'wallet_id' => $wallet->id
        ]);
        
        $response = $this->json('GET', '/api/wallet');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'id','money','transfers','created_at','updated_at'
            ])
            ->assertJsonCount(3, $response->json()['transfers']);

        dd($wallet->transfers);
        
    }

    public function testCreateTransfer(){
        $wallet = factory(Wallet::class)->create();
        $transfer = factory(Transfer::class)->make();

        $response = $this->json('POST', '/api/transfer', [
            'description' => $transfer->description,
            'amount' => $transfer->amount,
            'wallet_id' => $wallet->id
        ]);

        $response->assertJsonStructure([
            'id','description','amount','wallet_id'
        ])->assertStatus(201);

        $this->assertDatabaseHas('transfers', [
            'description' => $transfer->description,
            'amount' => $transfer->amount,
            'wallet_id' => $wallet->id
        ]);

        $this->assertDatabaseHas('wallets', [
            'id' => $wallet->id,
            'money' => $wallet->money + $transfer->amount
        ]);
    }
}
