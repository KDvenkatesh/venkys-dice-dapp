module 0x7906ab5611f09e6241ea7a5bf8273d86299c52d9559a390d47a2482acb953d9d::DiceGame {
    use std::signer;
    use std::table;

    struct GameData has key {
        rolls: table::Table<address, u8>,
        scores: table::Table<address, u64>,
    }

    public entry fun init(account: &signer) {
        move_to(account, GameData {
            rolls: table::new<address, u8>(),
            scores: table::new<address, u64>(),
        });
    }

    public entry fun roll(account: &signer, value: u8) acquires GameData {
        assert!(value >= 1 && value <= 6, 1);
        let addr = signer::address_of(account);
        let data = borrow_global_mut<GameData>(addr);
        table::add(&mut data.rolls, addr, value);

        let score_ref = table::borrow_mut_with_default(&mut data.scores, addr, 0);
        *score_ref = *score_ref + (value as u64);
    }

    public fun get_score(addr: address): u64 acquires GameData {
        let data = borrow_global<GameData>(addr);
        *table::borrow(&data.scores, addr)
    }
}
